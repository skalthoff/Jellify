#import "PhoneSceneDelegate.h"
#import "AppDelegate.h"
#import <UIKit/UIKit.h>

@implementation PhoneSceneDelegate

@synthesize window;

- (void)scene:(UIScene *)scene willConnectToSession:(UISceneSession *)session options:(UISceneConnectionOptions *)connectionOptions {
  // Ensure the app delegate is accessible and is of type AppDelegate
  AppDelegate *appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
  if (!appDelegate) return;

  // Ensure the scene is of type UIWindowScene
  UIWindowScene *windowScene = (UIWindowScene *)scene;
  if (!windowScene) return;

  // Initialize the app using the scene's connection options
  [appDelegate initAppFromScene:connectionOptions];

  // Create the root view controller and assign the root view to it
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = appDelegate.rootView;

  // Create the window and assign the root view controller
  self.window = [[UIWindow alloc] initWithWindowScene:windowScene];
  self.window.rootViewController = rootViewController;

  // Make the window key and visible
  [self.window makeKeyAndVisible];
}

@end
