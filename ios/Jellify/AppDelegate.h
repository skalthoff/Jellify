#import <RCTAppDelegate.h>
#import <React/RCTBundleURLProvider.h>
#import <UIKit/UIKit.h>

@interface AppDelegate : RCTAppDelegate

// Properties
@property (nonatomic, strong) UIView *rootView;
@property (nonatomic, assign) BOOL concurrentRootEnabled;

// Methods
+ (AppDelegate *)shared;
- (void)initAppFromScene:(UISceneConnectionOptions *)connectionOptions;
- (NSDictionary *)connectionOptionsToLaunchOptions:(UISceneConnectionOptions *)connectionOptions;

@end
