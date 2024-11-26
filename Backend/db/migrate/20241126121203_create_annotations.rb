class CreateAnnotations < ActiveRecord::Migration[7.2]
  def change
    create_table :annotations do |t|
      t.references :entry, null: false, foreign_key: true
      t.integer :number
      t.integer :debe
      t.integer :haber
      t.timestamps
    end
  end
end
