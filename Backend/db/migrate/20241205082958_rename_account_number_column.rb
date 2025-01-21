class RenameAccountNumberColumn < ActiveRecord::Migration[7.2]
  def change
    rename_column :accounts, :accountNumber, :account_number
  end
end
