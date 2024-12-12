class Entry < ApplicationRecord
  belongs_to :solution
  has_many :annotations, dependent: :destroy

  accepts_nested_attributes_for :annotations, allow_destroy: true
end
