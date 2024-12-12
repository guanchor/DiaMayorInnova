class CreateAnnotations < ActiveRecord::Migration[7.2]
  def change
    create_table :annotations do |t|
      t.references :entry, null: false, foreign_key: true
      t.integer :number
      t.integer :credit
      t.integer :debit
      t.timestamps
    end
  end
end
