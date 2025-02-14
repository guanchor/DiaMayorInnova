class AnnotationSerializer < ActiveModel::Serializer
  attributes :id, :number, :credit, :debit, :account_number, :account_name
end
