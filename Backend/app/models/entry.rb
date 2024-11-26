class Entry < ApplicationRecord
  belongs_to :solution
  has_many :annotation
end
