//  Programme de Lucas Bezanilla Bou
//  Adaptable selon le contexte du concour
let start_time = -1
//  Programme non démarré
let servoBool = true
let vide = true
basic.forever(function countTime() {
    let time: number;
    
    //  Vérifier si le capteur P0 est activé et que le programme n'a pas encore démarré
    if (start_time == -1 && pins.digitalReadPin(DigitalPin.P0) == 0) {
        start_time = control.millis()
    }
    
    //  Démarrer le timer une seule fois
    //  Exécuter la logique seulement si le programme a commencé
    if (start_time != -1) {
        time = control.millis() - start_time
        //  Temps écoulé
        if (3000 < time && time < 9650) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 200)
        } else if (time < 9850) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 100)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
        } else if (time < 18000 && vide) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 17)
        } else if (servoBool) {
            maqueen.motorStop(maqueen.Motors.All)
            for (let i = 0; i < 4; i++) {
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
    
})
//  Met à jour `vide` automatiquement
basic.forever(function on_forever() {
    
    vide = maqueen.Ultrasonic() <= 5
})
