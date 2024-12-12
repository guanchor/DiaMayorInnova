class AddDescriptionToHelpExamples < ActiveRecord::Migration[7.2]
  def change
    add_column :help_examples, :description, :text
  end
end
