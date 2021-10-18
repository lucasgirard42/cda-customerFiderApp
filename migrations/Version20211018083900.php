<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211018083900 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fidelity_points DROP INDEX UNIQ_C1AECCBC9395C3F3, ADD INDEX IDX_C1AECCBC9395C3F3 (customer_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fidelity_points DROP INDEX IDX_C1AECCBC9395C3F3, ADD UNIQUE INDEX UNIQ_C1AECCBC9395C3F3 (customer_id)');
    }
}
