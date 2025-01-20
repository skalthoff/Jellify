#import "AppDelegate.h"
#import <React/RCTAppDelegate.h>
#import <React/RCTBundleURLProvider.h>
#import <UIKit/UIKit.h>

@implementation AppDelegate

@synthesize rootView;
@synthesize concurrentRootEnabled;

+ (AppDelegate *)shared {
  return (AppDelegate *)[UIApplication sharedApplication].delegate;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  self.moduleName = @"YourModuleName";
  self.initialProps = @{}; // Add any initial props as needed
  
  // Call the base class method for any common initialization
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)initAppFromScene:(UISceneConnectionOptions *)connectionOptions {
  if (self.bridge != nil) {
    return;  // The bridge has already been initialized
  }

  bool enableTM = false;
#if RCT_NEW_ARCH_ENABLED
  enableTM = self.turboModuleEnabled;
#endif

  UIApplication *application = [UIApplication sharedApplication];
  RCTAppSetupPrepareApp(application, enableTM);

  if (self.bridge == nil) {
    self.bridge = [super createBridgeWithDelegate:self launchOptions:[self connectionOptionsToLaunchOptions:connectionOptions]];
  }

#if RCT_NEW_ARCH_ENABLED
  _contextContainer = std::make_unique<ContextContainer>();
  _reactNativeConfig = std::make_unique<EmptyReactNativeConfig>();
  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig.get());
  bridgeAdapter = std::make_unique<RCTSurfacePresenterBridgeAdapter>(self.bridge, _contextContainer.get());
  self.bridge.surfacePresenter = bridgeAdapter->surfacePresenter;
#endif

  NSDictionary *initProps = [self prepareInitialProps];
  self.rootView = [self createRootViewWithBridge:self.bridge moduleName:self.moduleName initProps:initProps];

  if (@available(iOS 13.0, *)) {
    self.rootView.backgroundColor = UIColor.systemBackgroundColor;
  } else {
    self.rootView.backgroundColor = UIColor.whiteColor;
  }
}

- (NSDictionary *)connectionOptionsToLaunchOptions:(UISceneConnectionOptions *)connectionOptions {
  NSMutableDictionary *launchOptions = [NSMutableDictionary dictionary];

  if (connectionOptions != nil) {
    if (connectionOptions.notificationResponse != nil) {
      [launchOptions setObject:connectionOptions.notificationResponse.notification.request.content.userInfo forKey:UIApplicationLaunchOptionsRemoteNotificationKey];
    }

    if (connectionOptions.userActivities.count > 0) {
      UISceneUserActivity *userActivity = connectionOptions.userActivities.firstObject;
      NSDictionary *userActivityDictionary = @{
        UIApplicationLaunchOptionsUserActivityTypeKey : userActivity.activityType,
        UIApplicationLaunchOptionsUserActivityKey : userActivity
      };
      [launchOptions setObject:userActivityDictionary forKey:UIApplicationLaunchOptionsUserActivityDictionaryKey];
    }
  }

  return launchOptions;
}

@end
