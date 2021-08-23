"""room name column

Revision ID: aa330b9938c2
Revises: 0bea89f7666f
Create Date: 2021-08-23 17:16:30.187442

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aa330b9938c2'
down_revision = '0bea89f7666f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('room', sa.Column('name', sa.String(length=128), nullable=True))
    op.create_index(op.f('ix_room_last_active'), 'room', ['last_active'], unique=False)
    op.create_unique_constraint(None, 'room', ['name'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'room', type_='unique')
    op.drop_index(op.f('ix_room_last_active'), table_name='room')
    op.drop_column('room', 'name')
    # ### end Alembic commands ###