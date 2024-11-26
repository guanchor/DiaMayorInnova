# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

  class_group1 = ClassGroup.create(course: 1, module: "TUM", modality: "Presencial", number_students: 24, max_students: 30, location: "Taller 12", weekly_hours: 6)
  class_group2 = ClassGroup.create(course: 2, module: "PNG", modality: "Distancia", number_students: 12, max_students: 20, location: "Aula 106", weekly_hours: 6)
  accPlan1 = AccountingPlan.create(name: "PGC para PYMES", description: "El plan más utilizado por el alumnado", acronym: "PGC PYMES")
  accPlan2 = AccountingPlan.create(name: "PGC prueba1", description: "Plan para probar el Crud 1", acronym: "PGC prueba1")
  accPlan3 = AccountingPlan.create(name: "PGC prueba2", description: "Plan para probar el Crud 2", acronym: "PGC prueba2")
  school1 = SchoolCenter.create(school_name: "El rincon",address: "calle de prueba 1",phone: "123456789",email: "elrincon@ies.elrincon.es",website: "www.ieselrincon.es",province: "Las Palmas")
  school1 = SchoolCenter.create(school_name: "IES Siete Palmas",address: "calle de siete palmas 1",phone: "987654321",email: "sietePalmas@ies.elrincon.es",website: "www.sietePalmas.es",province: "Las Palmas")


  solution1= Solution.create(description: "Descripcion solución 1 de prueba")
  solution2= Solution.create(description: "Descripcion solución 2 de prueba")

  entry1= Entry.create(solution:solution1, entry_number: 1, entry_date: Date.new(2024,11,25))
  entry2= Entry.create(solution:solution2, entry_number: 2, entry_date: Date.new(2024,11,26))

  annotation1 = Annotation.create(entry: entry1, number: 1, debe: 0 , haber: 100)
  annotation2 = Annotation.create(entry: entry1, number: 2, debe: 100 , haber: 0)
  annotation3 = Annotation.create(entry: entry2, number: 1, debe: 0 , haber: 300)
  annotation4 = Annotation.create(entry: entry2, number: 2, debe: 300 , haber: 0)