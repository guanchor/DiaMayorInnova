class CreateHelpExamples < ActiveRecord::Migration[7.2]
  def change
    create_table :help_examples do |t|
      t.text :creditMoves
      t.text :debitMoves
      t.references :accounts, null: false, foreign_key: true

      t.timestamps
    end
  end
end
