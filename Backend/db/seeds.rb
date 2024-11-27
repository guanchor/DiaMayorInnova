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
  task1 = Task.create(title: "Tarea 1 - Ficticia S.L.", opening_date: Date.new(2024, 11, 27), closing_date: DateTime.new(2024, 12, 1, 23, 59, 0))
  task2 = Task.create(title: "Tarea 2 - Inventada S.L.", opening_date: Date.new(2024, 11, 12), closing_date: DateTime.new(2024, 12, 1, 23, 59, 0))
  statement1 = Statement.create(definition: "Compramos mercaderías a 30 días por 1250€. El proveedor nos incluye en factura un descuento comercial del 2%. Además, la compra tiene unos gastos de transporte de 100€", explanation: "Explicación 1")
  statement2 = Statement.create(definition: "Vendemos mercaderías por valor de 3000€. Para el cobro giramos una letra de cambio a 30 días, que es aceptada.", explanation: "Explicación 2")
  statement3 = Statement.create(definition: "Devolvemos mercaderías por valor de 200€  al proveedor, por estar inservibles.", explanation: "Explicación 3")
  statement4 = Statement.create(definition: "El proveedor nos hace un descuento del 20% en la mercancía que está un poco defectuosa. Se paga al proveedor mediante transferencia.", explanation: "Explicación 4")
  statement5 = Statement.create(definition: "Descontamos la letra de cambio en la entidad bancaria, la cual nos cobra una comisión de 30€ y unos intereses de 80€.", explanation: "Explicación 5")
  statement6 = Statement.create(definition: "Se devenga la nómina de uno de nuestros trabajadores. El importe íntegro es de 2000€. La cuota empresarial a la Seguridad Social asciende a 700€. La cuota de la SS del trabajador sería de 30€. La retención de IRPF sería de 350€. Pasada 1 semana se paga mediante trasferencia bancaria.", explanation: "Explicación 6")

  task1.statements << statement1
  task1.statements << statement2
  task1.statements << statement3

  task2.statements << statement4
  task2.statements << statement5
  task2.statements << statement6
  task2.statements << statement2


  solution1= Solution.create(description: "Descripcion solución 1 de prueba")
  solution2= Solution.create(description: "Descripcion solución 2 de prueba")

  entry1= Entry.create(solution:solution1, entry_number: 1, entry_date: Date.new(2024,11,25))
  entry2= Entry.create(solution:solution2, entry_number: 2, entry_date: Date.new(2024,11,26))

  annotation1 = Annotation.create(entry: entry1, number: 1, debit: 0 , credit: 100)
  annotation2 = Annotation.create(entry: entry1, number: 2, debit: 100 , credit: 0)
  annotation3 = Annotation.create(entry: entry2, number: 1, debit: 0 , credit: 300)
  annotation4 = Annotation.create(entry: entry2, number: 2, debit: 300 , credit: 0)
