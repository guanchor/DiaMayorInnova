class CreateStatements < ActiveRecord::Migration[7.2]
  def change
    create_table :statements do |t|
      t.text :definition
      t.text :explanation

      t.timestamps
    end
  end
end
