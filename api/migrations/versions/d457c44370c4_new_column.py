"""new column

Revision ID: d457c44370c4
Revises: 6fec231311a6
Create Date: 2021-09-28 15:53:33.628151

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd457c44370c4'
down_revision = '6fec231311a6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('location', sa.String(length=64), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'location')
    # ### end Alembic commands ###
