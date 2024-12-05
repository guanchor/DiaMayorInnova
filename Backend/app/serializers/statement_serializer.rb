class StatementSerializer < ActiveModel::Serializer
  attributes :id, :definition, :explanation, :user_id, :is_public

  has_many :solutions, serializer: SolutionSerializer
end