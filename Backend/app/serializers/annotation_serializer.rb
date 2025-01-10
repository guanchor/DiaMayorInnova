class AnnotationSerializer < ActiveModel::Serializer
  attributes :id, :number, :credit, :debit, :account_number
end
