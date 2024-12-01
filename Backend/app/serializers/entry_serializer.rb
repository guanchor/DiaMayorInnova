class EntrySerializer < ActiveModel::Serializer
  attributes :id, :entry_number, :entry_date

  has_many :annotations, serializer: AnnotationSerializer # Incluye anotaciones en el serializador
end
