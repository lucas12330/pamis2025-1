pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
let start_time = -1
//  Programme non démarré
let servoBool = true
let vide = true
let cotes = ""
//  Réinitialisation obligatoire
//  Ajout des fonction de choix de cotès
input.onButtonPressed(Button.A, function Gauche() {
    
    basic.showLeds(`
    # . . . #
    # # . # .
    # # # . .
    # # . # .
    # . . . #
    `)
    cotes = "gauche"
})
input.onButtonPressed(Button.B, function Droite() {
    
    basic.showLeds(`
    # . . . #
    . # . # #
    . . # # #
    . # . # #
    # . . . #
    `)
    cotes = "droite"
})
//  Affiche un "?" au début pour forcer le choix
basic.showString("?")
basic.forever(function countTime() {
    let time: number;
    let i: number;
    
    if (pins.digitalReadPin(DigitalPin.P0)) {
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    } else {
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    }
    
    if (start_time == -1 && pins.digitalReadPin(DigitalPin.P0) == 0) {
        start_time = control.millis()
    }
    
    if (start_time != -1) {
        time = control.millis() - start_time
        if (cotes == "gauche") {
            if (3000 < time && time < 9650) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            } else if (9650 <= time && time < 9850) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
            } else if (9850 <= time && time < 18000 && vide) {
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 17)
            } else if (servoBool) {
                maqueen.motorStop(maqueen.Motors.All)
                for (i = 0; i < 4; i++) {
                    maqueen.servoRun(maqueen.Servos.S1, 180)
                    basic.pause(200)
                    maqueen.servoRun(maqueen.Servos.S1, 0)
                    basic.pause(200)
                    maqueen.servoRun(maqueen.Servos.S1, 180)
                }
                servoBool = false
            } else {
                maqueen.motorStop(maqueen.Motors.All)
            }
            
        } else if (cotes == "droite") {
            if (3000 < time && time < 9650) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 200)
            } else if (9650 <= time && time < 9850) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 100)
            } else if (9850 <= time && time < 18000 && vide) {
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 23)
            } else if (servoBool) {
                maqueen.motorStop(maqueen.Motors.All)
                for (i = 0; i < 4; i++) {
                    maqueen.servoRun(maqueen.Servos.S1, 180)
                    basic.pause(200)
                    maqueen.servoRun(maqueen.Servos.S1, 0)
                    basic.pause(200)
                    maqueen.servoRun(maqueen.Servos.S1, 180)
                }
                servoBool = false
            } else {
                maqueen.motorStop(maqueen.Motors.All)
            }
            
        }
        
    }
    
})
basic.forever(function on_forever() {
    
    vide = maqueen.Ultrasonic() <= 5
})
