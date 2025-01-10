# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # Crea un usuario invitado si no está logueado.

    if user.admin?
      # Los admin pueden gestionar todo
      can :manage, :all
    elsif user.teacher?
      # Los teachers pueden gestionar todos los class_groups
      can :manage, ClassGroup
      can :manage, AccountingPlan
      can :manage, SchoolCenter 
      can :manage, Task
      can :manage, Statement
      can :manage, Solution
    elsif user.student?
      # Los estudiantes solo pueden leer (ver) los class_groups
      cannot :manage, SchoolCenter
      cannot :manage, ClassGroup
      cannot :manage, Task
      cannot :read, Task
      cannot :manage, Statement
      cannot :read, Statement
      cannot :manage, Solution
      cannot :manage, Entry
      cannot :manage, Annotation
      can :index, AccountingPlan
      can :show, AccountingPlan
    else
      # Usuarios invitados no pueden hacer nada con los class_groups
      cannot :manage, :akk
    end

    can :manage, Task, created_by: user.id
  end
end
