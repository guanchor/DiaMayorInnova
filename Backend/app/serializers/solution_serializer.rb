class SolutionSerializer < ActiveModel::Serializer
  attributes :id, :description

  has_many :entries, serializer: EntrySerializer # Incluye entradas en el serializador
end