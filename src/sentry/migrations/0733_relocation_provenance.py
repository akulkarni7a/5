# Generated by Django 5.0.6 on 2024-07-02 20:56

from django.db import migrations, models

from sentry.new_migrations.migrations import CheckedMigration


class Migration(CheckedMigration):
    # This flag is used to mark that a migration shouldn't be automatically run in production.
    # This should only be used for operations where it's safe to run the migration after your
    # code has deployed. So this should not be used for most operations that alter the schema
    # of a table.
    # Here are some things that make sense to mark as post deployment:
    # - Large data migrations. Typically we want these to be run manually so that they can be
    #   monitored and not block the deploy for a long period of time while they run.
    # - Adding indexes to large tables. Since this can take a long time, we'd generally prefer to
    #   run this outside deployments so that we don't block them. Note that while adding an index
    #   is a schema change, it's completely safe to run the operation after the code has deployed.
    # Once deployed, run these manually via: https://develop.sentry.dev/database-migrations/#migration-deployment

    is_post_deployment = False

    dependencies = [
        ("sentry", "0732_add_span_attribute_extraction_rules"),
    ]

    operations = (
        migrations.SeparateDatabaseAndState(
            database_operations=[
                migrations.RunSQL(
                    """
                        ALTER TABLE "sentry_relocation" ADD COLUMN "provenance" integer NOT NULL DEFAULT 0;
                        """,
                    reverse_sql="""
                        ALTER TABLE "sentry_relocation" DROP COLUMN "provenance";
                        """,
                    hints={"tables": ["sentry_relocation"]},
                ),
            ],
            state_operations=[
                migrations.AddField(
                    model_name="relocation",
                    name="provenance",
                    field=models.SmallIntegerField(default=0),
                ),
            ],
        ),
    )
