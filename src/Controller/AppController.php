<?php

namespace App\Controller;

use App\Entity\Customers;
use App\Entity\FidelityPoints;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/", name="app")
     */
    public function index(): Response
    {
        return $this->render('app/index.html.twig', []);
    }

     /**
     * @Route("/customers", name="customers")
     */
    // public function test(Customers $customers, FidelityPoints $fidelityPoints): Response
    // {   
    //     $init = 0;

    //     $point = $fidelityPoints -> getPointFidelityCustomer(0);

    //     switch ($point) {
    //         case 9:
    //             $fidelityPoints->setPointFidelityCustomer($init);
    //             break;
            
    //         default:
                
    //             break;
    //     }

    //     $entityManager = $this->getDoctrine()->getManager();
    //                $entityManager->persist($fidelityPoints);
    //                $entityManager->flush();
    //     return $this->render('app/index.html.twig', []);
    // }


}


