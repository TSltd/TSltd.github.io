# SERVOGRBL

SERVOGRBL is a breakout board for the ESP32 DEVKITC to allow GRBL control of a 3 axis CNC machine using DC motors as servos instead of stepper motors. Currently it is in the first prototype itteration, version 0.1.

It uses 3 Arduino Pro Minis in place of stepper drivers to convert STEP/DIR signals into PWM with sensor feedback on each channel. 

H-bridges are used to drive the motors. Initial tests will be performed using 3x "IBT 2" modules (dual BTS7960). A note on these units: be sure to remove the heatsink and apply a good layer of thermal paste before re-attaching. The paste transfers heat through the PCB vias to the heatsink which is on the opposite side of the board to the chip. The paste needs to squeeze out through the vias on the other side behind the legs and along the top edge of the package. Thermal paste which dries hard will be best for this.

The board requires an external 5v power supply as none is included onboard.

The Pro-Minis need to be flashed before attaching using a USB-to-TTL serial converter to upoload the sketch.

A power switch is provided for the ESP32 to allow the 5V supply to be disconnected to prevent overpowering the board when using USB.

This board builds on the incredible work of [Bart Dring (GRBL_ESP32)](https://github.com/bdring) and [Miguel Sanchez (DCSERVO)](https://github.com/misan), to whom credit for its function is due.

![image](/blob/main/servogrbl_board.jpg)


![image](/blob/main/servogrbl_schematic.jpg)


The schematic for this board is open source. If you would like to be a beta tester for this board please contact me: dan@timberstar.co.uk

## Build Log

05/09/2021 Initial commit. Ordered test boards from JLCPCB. Version 0.1 schematic and 3d render uploaded.


