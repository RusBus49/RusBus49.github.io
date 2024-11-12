const workoutData = {
  week1: {
    monday: {
      title: "Push + Arms",
      description: "Chest, shoulder, and tricep focus with arm emphasis",
      warmup: [
          "Band Pull-aparts: 2 x 20",
          "Light Face Pulls: 2 x 20",
          "Arm Circles: 30 seconds each direction",
          "Push-ups: 2 x 10 with 2-second pause at bottom"
      ],
      exercises: [
          {
              name: "1. Incline Bench Press",
              details: [
                  "Warm-up sets:",
                  "- Bar × 10",
                  "- 95 lbs × 8",
                  "- 135 lbs × 5",
                  "Working sets:",
                  "- 155 lbs: 4 sets of 6-8 reps",
                  "Rest: 2-3 minutes",
                  "Superset with: Standing DB Curls 4 x 10-12 (35 lbs)"
              ],
              notes: "Use superset rest period to recover for next bench set"
          },
          {
              name: "2. Seated DB Press",
              details: [
                  "Working sets:",
                  "- 45 lbs: 3 sets of 8-10 reps",
                  "Rest: 90 seconds",
                  "Superset with: Incline DB Curls 3 x 12 (25 lbs)",
                  "Note: Emphasize stretch at bottom of curls"
              ]
          },
          {
              name: "3. Close-Grip to Skull Crusher Complex",
              details: [
                  "Close-Grip Bench Press:",
                  "- 70 lbs: 3 sets of 8-10 reps",
                  "Immediately into Skull Crushers:",
                  "- 70 lbs: 3 sets of 12 reps",
                  "Rest: 2 minutes between rounds",
                  "Note: No rest between exercises within complex"
              ]
          },
          {
              name: "4. EZ Bar Preacher Curls",
              details: [
                  "Working sets:",
                  "- 15 lbs per side: 4 sets of 10 reps",
                  "Last set: Triple drop set",
                  "Rest: 90 seconds between straight sets"
              ]
          },
          {
              name: "5. Superset Finisher",
              details: [
                  "A. Dips: 3 sets of 10 reps",
                  "B. Banded Hammer Curls: 3 sets of 15 reps",
                  "Rest: 60 seconds between supersets",
                  "Note: Focus on controlled negatives"
              ]
          }
      ]
  },
  tuesday: {
      title: "Legs (Quad Focus) + Running",
      description: "Quad-dominant leg training followed by running",
      warmup: [
          "Leg swings: 15 each direction/leg",
          "Walking lunges: 1 x 20 steps",
          "Empty bar squats: 15 reps",
          "Glute bridges: 2 x 15"
      ],
      exercises: [
          {
              name: "1. Front Squats",
              details: [
                  "Warm-up sets:",
                  "- Bar × 10",
                  "- 95 lbs × 8",
                  "- 135 lbs × 5",
                  "Working sets:",
                  "- 185 lbs: 3 sets of 5 reps",
                  "- 205 lbs: 2 sets of 3 reps",
                  "Rest: 2.5-3 minutes between sets"
              ],
              notes: "Focus on maintaining upright torso position"
          },
          {
              name: "2. Leg Press",
              details: [
                  "3 working sets: 8-10 reps",
                  "1 back-off set: 15 reps",
                  "Rest: 2 minutes",
                  "Note: Feet shoulder width, focus on quad engagement"
              ]
          },
          {
              name: "3. Leg Extensions",
              details: [
                  "4 sets: 12-15 reps",
                  "Last set: Triple drop set",
                  "Rest: 90 seconds",
                  "Note: Hold peak contraction for 1 second"
              ]
          },
          {
              name: "4. Post-Run Arm Work",
              details: [
                  "Superset:",
                  "A. Rope Pushdowns: 3 x 15",
                  "B. DB Hammer Curls: 3 x 12",
                  "Rest: 60 seconds between supersets"
              ]
          }
      ],
      runningPlan: {
          name: "Running Component",
          details: [
              "5-10 minute walk/light jog warm-up",
              "Main run",
              "5 minute cool-down walk"
          ]
      }
  },
  wednesday: {
      title: "Back + Arms",
      description: "Heavy back training with deadlifts and arm focus",
      warmup: [
          "Band Pull-aparts: 2 x 20",
          "Cat-cow stretches: 10 reps",
          "Light straight-arm pulldowns: 2 x 15",
          "Dead hangs: 30 seconds"
      ],
      exercises: [
          {
              name: "1. Deadlifts",
              details: [
                  "Warm-up sets:",
                  "- 135 lbs × 8",
                  "- 225 lbs × 5",
                  "- 275 lbs × 3",
                  "Working sets:",
                  "- 315 lbs: 3 sets of 5 reps",
                  "Rest: 3 minutes between sets"
              ],
              notes: "Focus on proper bracing and hip hinge"
          },
          {
              name: "2. Pull-ups/Lat Pulldowns",
              details: [
                  "4 working sets: 8-10 reps",
                  "Rest: 2 minutes",
                  "Superset with: Hammer Curls 4 x 12"
              ]
          },
          {
              name: "3. Barbell Rows",
              details: [
                  "3 working sets: 8-10 reps",
                  "1 back-off set: 15 reps",
                  "Rest: 2 minutes",
                  "Superset with: Rope Hammers 3 x 15"
              ]
          },
          {
              name: "4. Cable Rows",
              details: [
                  "3 sets: 12 reps",
                  "Focus: 2-second squeeze at contraction",
                  "Rest: 90 seconds",
                  "Superset with: Single-arm Cable Curls 3 x 12/arm"
              ]
          },
          {
              name: "5. Reverse Flyes",
              details: [
                  "3 sets: 12-15 reps",
                  "Rest: 60 seconds",
                  "Superset with: Cross-body Hammer Curls 3 x 12"
              ]
          }
      ]
  },
  thursday: {
      title: "Legs (Hip Dominant) + Running",
      description: "Hip and posterior chain focus with running",
      warmup: [
          "Hip airplanes: 10 each leg",
          "Fire hydrants: 12 each side",
          "Banded lateral walks: 2 x 15 steps each direction",
          "Empty bar squats: 2 x 10"
      ],
      exercises: [
          {
              name: "1. Back Squats",
              details: [
                  "Warm-up sets:",
                  "- Bar × 10",
                  "- 135 lbs × 8",
                  "- 185 lbs × 5",
                  "Working sets:",
                  "- 275 lbs: 3 sets of 5 reps",
                  "- 295 lbs: 1 set of 3 reps",
                  "Rest: 2.5-3 minutes"
              ]
          },
          {
              name: "2. Romanian Deadlifts",
              details: [
                  "Warm-up sets:",
                  "- 135 lbs × 8",
                  "- 185 lbs × 5",
                  "Working sets:",
                  "- 245 lbs: 3 sets of 6 reps",
                  "- 265 lbs: 2 sets of 4 reps",
                  "Rest: 2.5-3 minutes"
              ]
          },
          {
              name: "3. Bulgarian Split Squats",
              details: [
                  "3 sets each leg: 10-12 reps",
                  "Rest: 60 seconds between legs"
              ]
          },
          {
              name: "4. Lying Leg Curls",
              details: [
                  "4 sets: 12-15 reps",
                  "Last set: Double drop set",
                  "Rest: 90 seconds"
              ]
          },
          {
              name: "5. Post-Run Arm Work",
              details: [
                  "Superset 1:",
                  "- Close-Grip Pushups: 3 x 12-15",
                  "- DB Hammer Curls: 3 x 12",
                  "Superset 2:",
                  "- Overhead Rope Extensions: 4 x 15",
                  "- Cable Curls: 3 x 12",
                  "Rest: 60 seconds between supersets"
              ]
          }
      ],
      runningPlan: {
          name: "Running Component",
          details: [
              "5-10 minute walk/light jog warm-up",
              "Main run",
              "5 minute cool-down walk"
          ]
      }
  },
  friday: {
      title: "Shoulders + Arms",
      description: "Heavy shoulder focus with arm volume",
      warmup: [
          "Band Pull-aparts: 2 x 20",
          "Arm circles: 30 seconds each direction",
          "Light lateral raises: 2 x 15",
          "Empty bar press: 2 x 15"
      ],
      exercises: [
          {
              name: "1. Standing Barbell Press",
              details: [
                  "Warm-up sets:",
                  "- Bar × 10",
                  "- 65 lbs × 8",
                  "- 85 lbs × 5",
                  "Working sets:",
                  "- 105 lbs: 3 sets of 8 reps",
                  "- 115 lbs: 1 set of 6 reps",
                  "Rest: 2-2.5 minutes"
              ]
          },
          {
              name: "2. Lateral Raise Complex",
              details: [
                  "3 rounds of:",
                  "- Strict laterals: 12 reps",
                  "- Partial reps from bottom: 8 reps",
                  "- Partial reps from top: 8 reps",
                  "Rest: 90 seconds"
              ]
          },
          {
              name: "3. Reverse Flyes",
              details: [
                  "4 sets: 12-15 reps",
                  "Last set: drop set",
                  "Rest: 60 seconds"
              ]
          },
          {
              name: "4. Giant Set",
              details: [
                  "3 rounds of:",
                  "- EZ Bar Close Grip Press: 12 reps",
                  "- DB Hammer Curls: 12 reps",
                  "- Rope Pushdowns: 15 reps",
                  "- Cross-body Hammer Curls: 12 reps",
                  "Rest: 2 minutes between rounds"
              ]
          },
          {
              name: "5. Superset Finisher",
              details: [
                  "3 rounds of:",
                  "A. Single-Arm OH DB Extensions: 12 each",
                  "B. Cable Curls (neutral grip): 12",
                  "Rest: 60 seconds between rounds"
              ]
          }
      ]
  },
  saturday: {
      title: "Light Upper + Arms",
      description: "Active recovery focused upper body training",
      warmup: [
          "Band Pull-aparts: 2 x 20",
          "Arm circles: 30 seconds each direction",
          "Light face pulls: 15-20 reps",
          "Band tricep extensions: 15-20 reps"
      ],
      exercises: [
          {
              name: "1. Superset",
              details: [
                  "A. Incline DB Bench: 3 x 12-15",
                  "B. DB Row: 3 x 12-15",
                  "Rest: 60 seconds",
                  "Note: Focus on mind-muscle connection"
              ]
          },
          {
              name: "2. Superset",
              details: [
                  "A. Lateral Raises: 3 x 15-20",
                  "B. Reverse Flyes: 3 x 15-20",
                  "Rest: 60 seconds"
              ]
          },
          {
              name: "3. Tri-set Arms",
              details: [
                  "3 rounds of:",
                  "- Rope Pushdowns: 20 reps",
                  "- Hammer Curls: 15 reps",
                  "- Overhead Rope Extensions: 20 reps",
                  "Rest: 90 seconds between rounds"
              ]
          },
          {
              name: "4. Core Work",
              details: [
                  "Circuit:",
                  "- Turkish Get-Ups: 3 x 3/side",
                  "- Copenhagen Planks: 3 x 30s/side",
                  "- Cable Woodchoppers: 3 x 12/side",
                  "Rest: 45-60 seconds between exercises"
              ]
          }
      ]
  },
  sunday: {
      title: "Sprint Training",
      description: "High-intensity sprint work, no weight training",
      warmup: [
          "Light jogging: 5-10 minutes",
          "Dynamic stretching",
          "Acceleration drills",
          "Form running drills"
      ],
      exercises: [
          {
              name: "Sprint Training",
              details: [
                  "Rest Day from Gym",
                  "Focus on sprint technique and recovery"
              ]
          }
      ]
    }
  }
};