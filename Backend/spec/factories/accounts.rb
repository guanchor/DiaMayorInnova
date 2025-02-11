FactoryBot.define do
    factory :account do
      sequence(:name) { |n| "Account #{n}" }
      sequence(:account_number) { |n| "AccNumber #{n}"}
      sequence(:description) { |n| "Descripction #{n}" }
      association :accounting_plan # Crea el PGC al que pertenece
    end
  end
    
