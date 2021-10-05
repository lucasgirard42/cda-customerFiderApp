<?php
// "PUT"={"security"="is_granted('edit', object)"},                 
// "DELETE"={"security"="is_granted('delete', object)"}

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CustomersRepository;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      collectionOperations={"GET",
 *                            "POST"={"security"="is_granted('ROLE_USER')"}
 *                           },
 *      itemOperations={"GET",
 *                      "PUT",
 *                      "DELETE"
 *          },
 *      normalizationContext={"groups"={"customers:read"}},
 *      denormalizationContext={"groups"={"customers:write"}}
 * )
 * @ORM\Entity(repositoryClass=CustomersRepository::class)
 */
class Customers
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"customers:read", "user:read", "fidelityPoints:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers:read", "customers:write", "user:read"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers:read", "customers:write", "user:read"})
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers:read", "customers:write"})
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers:read", "customers:write", "user:read",  "fidelityPoints:read"})
     */
    private $email;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"customers:read", "customers:write"})
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers:read", "customers:write"})
     */
    private $society;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * 
     */
    private $image;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers:read", "customers:write"})
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customers:read", "customers:write"})
     */
    private $service;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"customers:read", "customers:write"})
     */
    private $zipcode;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups("customers:read")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups("customers:read")
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=FidelityPoints::class, mappedBy="customer")
     * @ApiSubresource
     * @Groups({"customers:read", "customers:write", "user:read"})
     */
    private $fidelityPoints;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="customers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->fidelityPoints = new ArrayCollection();
       

    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?int
    {
        return $this->phone;
    }

    public function setPhone(?int $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getSociety(): ?string
    {
        return $this->society;
    }

    public function setSociety(?string $society): self
    {
        $this->society = $society;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getService(): ?string
    {
        return $this->service;
    }

    public function setService(?string $service): self
    {
        $this->service = $service;

        return $this;
    }

    public function getZipcode(): ?int
    {
        return $this->zipcode;
    }

    public function setZipcode(?int $zipcode): self
    {
        $this->zipcode = $zipcode;

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

    /**
     * @return Collection|FidelityPoints[]
     */
    public function getFidelityPoints(): Collection
    {
        return $this->fidelityPoints;
    }

    public function addFidelityPoint(FidelityPoints $fidelityPoint): self
    {
        if (!$this->fidelityPoints->contains($fidelityPoint)) {
            $this->fidelityPoints[] = $fidelityPoint;
            $fidelityPoint->setCustomer($this);
        }

        return $this;
    }

    public function removeFidelityPoint(FidelityPoints $fidelityPoint): self
    {
        if ($this->fidelityPoints->removeElement($fidelityPoint)) {
            // set the owning side to null (unless already changed)
            if ($fidelityPoint->getCustomer() === $this) {
                $fidelityPoint->setCustomer(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    
}
