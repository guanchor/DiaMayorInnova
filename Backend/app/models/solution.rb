class Solution < ApplicationRecord
  has_many :entrys
  belongs_to :statement
end
