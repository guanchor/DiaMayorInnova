import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest'; // Ensure using 'vi' for mocking
import EntriesSection from '../EntriesSection';
import { useNavigate } from 'react-router-dom';
import taskSubmitService from '../../../services/taskSubmitService';  // Ensure import is correct


// Test Incompleto, faltan cosas por comprobar

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../../services/taskSubmitService', () => ({
  default: vi.fn(),
}));

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe('EntriesSection Component', () => {
  let mockOnStatementComplete;

  beforeEach(() => {
    mockOnStatementComplete = vi.fn();
  });

  it('Se carga el componente', () => {
    render(
      <EntriesSection
        selectedStatement={{ id: 'statement-1' }}
        taskId="task-1"
        onStatementComplete={mockOnStatementComplete}
        exercise={{ chartOfAccounts: [] }}
        examStarted={true}
      />
    );

    expect(screen.getByText(/Guardar y Continuar/i)).toBeInTheDocument();
    expect(screen.getByText(/Enviar Examen/i)).toBeInTheDocument();
  });

  it('Llamar a onStatementComplete cuando se clickea en continua', () => {
    render(
      <EntriesSection
        selectedStatement={{ id: 'statement-1' }}
        taskId="task-1"
        onStatementComplete={mockOnStatementComplete}
        exercise={{ chartOfAccounts: [] }}
        examStarted={true}
      />
    );

    fireEvent.click(screen.getByText(/Guardar y Continuar/i));

    expect(mockOnStatementComplete).toHaveBeenCalledWith(
      'statement-1',
      expect.objectContaining({ entries: [], annotations: [] })
    );
  });
});
