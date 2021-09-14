<?php

// src/DataPersister

namespace App\DataPersister;

use App\Entity\Customers;
use App\Entity\FidelityPoints; 
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\String\Slugger\SluggerInterface;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;

/**
 *
 */
class CustomersDataPersister implements ContextAwareDataPersisterInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $_entityManager;

    /**
     * @param SluggerInterface
     */
    private $_slugger;

    /**
     * @param Request
     */
    private $_request;

    public function __construct(
        EntityManagerInterface $entityManager,
        SluggerInterface $slugger,
        RequestStack $request
    ) {
        $this->_entityManager = $entityManager;
        $this->_slugger = $slugger;
        $this->_request = $request->getCurrentRequest();
    }

    /**
     * {@inheritdoc}
     */
    public function supports($data, array $context = []): bool
    {
        return $data instanceof Customers;
    }

    /**
     * @param Customers $data
     */
    public function persist($data, array $context = [])
    {
        // Update the slug only if the article isn't published
        // if (!$data->getFirstName()) {
        //     $data->getLastName(
        //         $this
        //             ->_slugger
        //             ->slug(strtolower($data->getAddress())). '-' .uniqid()
        //     );
        // }

        // Set the updatedAt value if it's not a POST request
        if ($this->_request->getMethod() !== 'POST') {
            $data->setUpdatedAt(new \DateTime());
        }

      

        $this->_entityManager->persist($data);
        $this->_entityManager->flush();
    }

    

    /**
     * {@inheritdoc}
     */
    public function remove($data, array $context = [])
    {
        $this->_entityManager->remove($data);
        $this->_entityManager->flush();
    }
}