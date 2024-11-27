class CreateAccounts < ActiveRecord::Migration[7.2]
  def change
    create_table :accounts do |t|
      t.integer :accountNumber
      t.string :description
      t.references :accounting_plan, null: false, foreign_key: true

      t.timestamps
    end
  end
end
