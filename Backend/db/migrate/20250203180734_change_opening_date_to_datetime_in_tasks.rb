class ChangeOpeningDateToDatetimeInTasks < ActiveRecord::Migration[7.2]
  def change
    change_column :tasks, :opening_date, :datetime
  end
end
