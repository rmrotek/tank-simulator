# tank-simulator


Zadanie polega na zbudowaniu symulatora czołgu.

- Czołg powinien być widoczny z lotu ptaka.
  - Czołg powinien być prostokątem o wymiarach 60px długości i 40px szerokości
- Czołg powinien poruszać się po całym ekranie.
  - Czołg, gdy wyjedzie poza prawą krawędź ekranu, to ma pojawić się po przeciwległej stronie.
- Czołg powinien obracać się wokół własnej osi, gdy trzymamy klawisze 'A' i 'D' (w lewo, w prawo). 
  - Jeżeli oba są wduszone, to nie powinien się obracać.
- Czołg powinien poruszać się do przodu, gdy trzymamy klawisz 'W'
  - Czołg powinien poruszać się do tyłu, gdy trzymamy klawisz 'S'
- Czołg powinien posiadać okrągłą wieżyczkę z prostokątną armatą.
  - Wieżyczka naturalnie powinna poruszać się wraz z czołgiem (nie powinien jej zgubić)
  - Wieżyczka powinna być kołem o promieniu 15px
  - Armata powinna posiadać wymiary 20px długości i 6px szerokości
  - Wieżyczka powinna obracać się niezależnie od kirunku jazdy czołgu
  - Wieżyczka powinna podążać za myszką na ekranie
    - Po wduszeniu klawisza 'R' sterowanie wieżyczką powinno odbywać się klawiszami 'Q' - obrót w lewo; 'E' - obrót w prawo
    - Po ponownym wduszeniu klawisza 'R' wieżyczka powinna wrócić do trybu sterowania kursorem myszy
  - Po wduszeniu klawisza spacji powinien pojawić się na ekranie pasek ładowania pocisku
    - Ładowanie ma trwać 3 sekundy
    - Ponowne wduszenie klawisza spacji spowoduje wystrzał pocisku
      - Pocisk powinien być kołem o promieniu 3px
      - Pocisk powinien zostać utworzony na końcu armaty
      - Pocisk powinien poruszać się po linii prostej z prędkością 100px / sekundę
      - Pocisk powinien znikać po 3 sekundach
