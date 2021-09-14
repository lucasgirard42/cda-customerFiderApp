<?php

namespace App\Repository;

use App\Entity\FidelityPoints;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method FidelityPoints|null find($id, $lockMode = null, $lockVersion = null)
 * @method FidelityPoints|null findOneBy(array $criteria, array $orderBy = null)
 * @method FidelityPoints[]    findAll()
 * @method FidelityPoints[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FidelityPointsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FidelityPoints::class);
    }

    // /**
    //  * @return FidelityPoints[] Returns an array of FidelityPoints objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?FidelityPoints
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
