class CreateEntries < ActiveRecord::Migration[7.2]
  def change
    create_table :entries do |t|
      t.references :solution, null: false, foreign_key: true
      t.integer :entry_number
      t.date :entry_date
      t.timestamps
    end
  end
end
