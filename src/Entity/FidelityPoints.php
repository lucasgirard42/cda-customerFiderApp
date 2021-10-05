<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\FidelityPointsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
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
     * @Groups({"fidelityPoints:read", "customers:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"fidelityPoints:read", "fidelityPoints:write", "customers:read", "customers:write", "user:read"})
     */
    private $pointFidelityCustomer;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"fidelityPoints:read", "customers:read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"fidelityPoints:read", "customers:read"})
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
       
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPointFidelityCustomer(): ?int
    {
        return $this->pointFidelityCustomer;
    }

    public function setPointFidelityCustomer(?int $pointFidelityCustomer): self
    {
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
