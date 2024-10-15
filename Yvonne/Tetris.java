import javax.swing.JFrame;

class Tetris{
    public static void main(){
        JFrame tetris = new JFrame("Tetris Game");
        GamePanel gamePanel = new GamePanel();
        GameController gameController = new GameController(gamePanel);
        gamePanel.setController(gameController);
        tetris.add(gamePanel);
        tetris.setSize(300,600);
        tetris.setResizable(false);
        tetris.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        tetris.setLocationRelativeTo(null);
        tetris.setVisible(true);
    }
}