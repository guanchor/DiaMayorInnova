class CreateMarks < ActiveRecord::Migration[7.2]
  def change
    create_table :marks do |t|
      t.decimal :mark

      t.timestamps
    end
  end
end
