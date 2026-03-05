import { render, screen, fireEvent } from '@testing-library/react';
import ModalVideo from './ModalVideo';

// react-player está mockeado globalmente via moduleNameMapper

const defaultProps = {
  videoKey: 'dQw4w9WgXcQ',
  videoPlatform: 'YouTube',
  onClose: jest.fn(),
};

describe('ModalVideo', () => {
  test('no renderiza el player cuando el modal está cerrado', () => {
    render(<ModalVideo {...defaultProps} open={false} />);
    expect(screen.queryByTestId('react-player')).not.toBeInTheDocument();
  });

  test('renderiza el player cuando el modal está abierto', () => {
    render(<ModalVideo {...defaultProps} open={true} />);
    expect(screen.getByTestId('react-player')).toBeInTheDocument();
  });

  test('usa la URL de YouTube correcta', () => {
    render(<ModalVideo {...defaultProps} open={true} />);
    expect(screen.getByTestId('react-player')).toHaveAttribute(
      'src',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    );
  });

  test('llama a onClose al hacer clic en el botón de cerrar', () => {
    const onClose = jest.fn();
    render(<ModalVideo {...defaultProps} open={true} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('usa URL de Vimeo cuando la plataforma es Vimeo', () => {
    render(
      <ModalVideo videoKey="123456" videoPlatform="Vimeo" open={true} onClose={jest.fn()} />
    );
    expect(screen.getByTestId('react-player')).toHaveAttribute(
      'src',
      'https://vimeo.com/123456'
    );
  });
});
