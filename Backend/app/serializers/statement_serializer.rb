class StatementSerializer < ActiveModel::Serializer
  attributes :id, :definition, :explanation, :user_id, :is_public
end