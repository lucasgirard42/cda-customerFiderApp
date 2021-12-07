<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211206140136 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fidelity_points CHANGE point_fidelity_customer point_fidelity_customer DOUBLE PRECISION DEFAULT \'0\' NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE reduction reduction VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fidelity_points CHANGE point_fidelity_customer point_fidelity_customer DOUBLE PRECISION DEFAULT \'1\' NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE reduction reduction INT DEFAULT NULL');
    }
}
