# frozen_string_literal: true

require 'rails_helper'

describe User do
  let(:user) { create(:user, role: 'student') }

  it { expect(user).to be_valid }
  it { expect(user.role).to eq 'student' }

  let(:teacher_user) { create(:user, role: 'teacher') } # Esta forma, y la siguiente son lo mismo, pero en la siguiente pruebo la factory creada actes
  it { expect(teacher_user).to be_valid }
  it { expect(teacher_user.role).to eq 'teacher' }

  let(:teacher_user) { create(:teacher_user) }
  it { expect(teacher_user).to be_valid }
  it { expect(teacher_user.role).to eq 'teacher' }
end