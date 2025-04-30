// ios/AppDelegate.swift
import UIKit
import CarPlay
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
        
  static var appName: String = "Jellify"
  
  var window: UIWindow?
  
  var reactNativeDelegate: ReactNativeDelegate? = nil
  var reactNativeFactory: RCTReactNativeFactory? = nil
  
  func initReactNative(
    launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil
  ) -> Bool {
    print("Creating React Native Delegate for \(AppDelegate.appName)")
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    
    delegate.dependencyProvider = RCTAppDependencyProvider()
    
    reactNativeDelegate = delegate
    reactNativeFactory = factory
    
    reactNativeFactory?.startReactNative(
      withModuleName: AppDelegate.appName,
      in: window,
      launchOptions: launchOptions
    )
    
    return true
  }
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        
    window = UIWindow(frame: UIScreen.main.bounds)

    if (reactNativeDelegate == nil && reactNativeFactory == nil) {
      return initReactNative(launchOptions: launchOptions)
    } else {
      return true
    }
  }
  
  func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
    if (connectingSceneSession.role == UISceneSession.Role.carTemplateApplication) {
      let scene =  UISceneConfiguration(name: "CarPlay", sessionRole: connectingSceneSession.role)
      scene.delegateClass = CarSceneDelegate.self
      return scene
    } else {
      let scene =  UISceneConfiguration(name: "Phone", sessionRole: connectingSceneSession.role)
      scene.delegateClass = PhoneSceneDelegate.self
      return scene
    }
  }
  
  func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
  }
  
  func applicationDidBecomeActive(_ application: UIApplication) {
    print("Jellify is alive!")
  }
}

