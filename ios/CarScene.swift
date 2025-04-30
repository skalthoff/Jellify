// ios/CarScene.swift
import Foundation
import CarPlay

class CarSceneDelegate: UIResponder, CPTemplateApplicationSceneDelegate {
  
  func templateApplicationScene(_ templateApplicationScene: CPTemplateApplicationScene, didConnect interfaceController: CPInterfaceController) {
    print("CarPlay Scene Delegate activated")
            
    
    guard let appDelegate = (UIApplication.shared.delegate as? AppDelegate) else { return }
  
    
    // If we are in a "cold start", where the CarPlay Scene is launched before the Phone
    // Scene, initialize the React App
    if appDelegate.reactNativeFactory == nil || appDelegate.reactNativeDelegate == nil {
      print("Starting Jellify with CarPlay")
      let initResult = appDelegate.initReactNative()
      
      if initResult {
        print("Initialized Jellify via CarPlay scene")
      } else {
        print("Unable to initialize Jellify via CarPlay scene")
      }
    } else {
      print("Phone scene already running")
    }
    
    // Connect CarPlay
    RNCarPlay.connect(with: interfaceController, window: templateApplicationScene.carWindow)
  }

  func templateApplicationScene(_ templateApplicationScene: CPTemplateApplicationScene, didDisconnectInterfaceController interfaceController: CPInterfaceController) {
    RNCarPlay.disconnect()
  }
}
