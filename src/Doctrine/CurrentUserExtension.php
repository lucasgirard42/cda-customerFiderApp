<?php
// api/src/Doctrine/CurrentUserExtension.php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Customers;
use App\Entity\User;
use App\Entity\FidelityPoints;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;

final class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;
   

    public function __construct(Security $security)
    {
        $this->security = $security;
        
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass): void
    {   
        // Obtenir l'utilisateur connecté
        $user = $this->security->getUser();

        // 2. Si on demande des FidelityPoint ou des customers alors, agir sur la requête pour qu'elle tienne compte de l'utilisateur connecté
        if (
            ($resourceClass === Customers::class || $resourceClass === FidelityPoints::class)
            &&
            !$this->security->isGranted('ROLE_ADMIN')
            &&
            $user instanceof User
        ) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            //dd($queryBuilder);
            dd($rootAlias);
            //SELECT o FROM APP\Entity\Customer
            // WHERE o ... 
            
            if ($resourceClass === Customers::class) {
                $queryBuilder->andWhere("$rootAlias.user = :user");
            } else if ($resourceClass === FidelityPoints::class) {
                $queryBuilder->join("$rootAlias.customer", "c")
                ->andWhere("c.user = :user");
            }
            
            $queryBuilder->setParameter("user", $user);
           
        }
    }
}

