<?php


namespace App\Security;


use App\Entity\User;
use App\Entity\Customers;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface; 



class CustomersVoter extends Voter 
{
    const EDIT = 'edit';
    const DELETE = 'delete';


   /**
     * Determines if the attribute and subject are supported by this voter.
     *
     * @param string $attribute An attribute
     * @param mixed  $subject   The subject to secure, e.g. an object the user wants to access or any other PHP type
     *
     * @return bool True if the attribute and subject are supported, false otherwise
     */

    protected function supports(string $attribute, $subject)
    {
        if (!in_array($attribute, [self::EDIT, self::DELETE])) {
            return false;
        }

        if (!$subject instanceof Customers) {
            return false;
        }

        return true;
    }

    /**
     * Perform a single access check operation on a given attribute, subject and token.
     * It is safe to assume that $attribute and $subject already passed the "supports()" method check.
     *
     * @param mixed $subject
     *
     * @return bool
     */

    protected function voteOnAttribute(
        string $attribute,
        $subject,
        TokenInterface $token
    ) {
        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }

    /**
         * @var Customers
         */
        $customer = $subject;

        return $user->hasRoles('ROLE_ADMIN') || $user === $customer->getUser();

    }

}