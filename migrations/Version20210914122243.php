<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210914122243 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fidelity_points ADD customer_id INT NOT NULL');
        $this->addSql('ALTER TABLE fidelity_points ADD CONSTRAINT FK_C1AECCBC9395C3F3 FOREIGN KEY (customer_id) REFERENCES customers (id)');
        $this->addSql('CREATE INDEX IDX_C1AECCBC9395C3F3 ON fidelity_points (customer_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fidelity_points DROP FOREIGN KEY FK_C1AECCBC9395C3F3');
        $this->addSql('DROP INDEX IDX_C1AECCBC9395C3F3 ON fidelity_points');
        $this->addSql('ALTER TABLE fidelity_points DROP customer_id');
    }
}
