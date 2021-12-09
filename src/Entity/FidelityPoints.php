<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\FidelityPointsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\User;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

/**
 * @ApiResource(
 *      subresourceOperations={
 *        "api_customers_fidelityPoints_get_subresource"={
 *             "normalization_context"={"groups"={"fidelityPoints_subresource"}}
 *         }
 *     },
 *      collectionOperations={"GET","POST"},
 *      itemOperations={"GET","PUT","DELETE"},
 *      normalizationContext={"groups"={"fidelityPoints:read"}},
 *      denormalizationContext={"groups"={"fidelityPoints:write"}}
 * )
 * @ORM\Entity(repositoryClass=FidelityPointsRepository::class)
 */
class FidelityPoints
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"fidelityPoints:read", "customers:read", "fidelityPoints_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="float",  options={"default":0})
     * @Groups({"fidelityPoints:read", "fidelityPoints:write", "customers:read", "customers:write", "user:read", "fidelityPoints_subresource"})
     * @Assert\NotBlank(message="Le point de la fidélité est obligatoire !")
     * 
     */
    private $pointFidelityCustomer;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"fidelityPoints:read", "customers:read", "fidelityPoints_subresource"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"fidelityPoints:read", "customers:read", "fidelityPoints_subresource"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=Customers::class, inversedBy="fidelityPoints")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"fidelityPoints:write", "fidelityPoints:read" })
     */
    private $customer;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
       $this->pointFidelityCustomer = 0;
    
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPointFidelityCustomer(): ?float
    {
        return $this->pointFidelityCustomer;
    }

    public function setPointFidelityCustomer(?float $pointFidelityCustomer): self
    {
        // $init = 0;
        // if ($pointFidelityCustomer < 11 ? 1:0) {
            
        //     $this->pointFidelityCustomer = $pointFidelityCustomer;
        // }
        // else {
        //     $this->pointFidelityCustomer  = $init;
            
        // }
        $this->pointFidelityCustomer = $pointFidelityCustomer;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getCustomer(): ?Customers
    {
        return $this->customer;
    }

    public function setCustomer(?Customers $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

}
