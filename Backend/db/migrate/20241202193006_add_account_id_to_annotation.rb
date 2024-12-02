class AddAccountIdToAnnotation < ActiveRecord::Migration[7.2]
  def change
    add_reference :annotations, :account, null: false, foreign_key: true
  end
end
