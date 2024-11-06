class CreateAccountingPlans < ActiveRecord::Migration[7.2]
  def change
    create_table :accounting_plans do |t|
      t.string :name
      t.string :description
      t.string :acronym
      t.timestamps
    end
  end
end
