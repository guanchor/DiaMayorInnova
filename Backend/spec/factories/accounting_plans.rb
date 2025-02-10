FactoryBot.define do
    factory :accounting_plan do
      sequence(:name) { |n| "Accounting Plan #{n}" }
      sequence(:description) { |n| "Description #{n}" }
      sequence(:acronym) { |n| "AP#{n}" }
    end
  end
  